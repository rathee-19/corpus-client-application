import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/upload/UploadForm.tsx
import { useEffect, useState } from "react";
import { Form, Input, Select, Button, Radio, message, Space, Typography } from "antd";
import apiClient from "@/api/auth.api";
const { TextArea } = Input;
const { Title } = Typography;
const LANGUAGES = [
    "assamese", "bengali", "bodo", "dogri", "gujarati", "hindi", "kannada", "kashmiri", "konkani", "maithili",
    "malayalam", "marathi", "meitei", "nepali", "odia", "punjabi", "sanskrit", "santali", "sindhi", "tamil",
    "telugu", "urdu", "NA"
];
const EXTENSIONS_BY_TYPE = {
    text: [".txt", ".md", ".doc", ".docx", ".pdf", ".rtf"],
    audio: [".mp3", ".wav", ".m4a", ".flac", ".ogg", ".aac"],
    video: [".mp4", ".mov", ".webm", ".mkv", ".avi"],
    image: [".jpg", ".jpeg", ".png", ".webp", ".heic"],
    document: [".pdf", ".doc", ".docx", ".ppt", ".pptx", ".xls", ".xlsx"],
};
const humanize = (exts) => exts.join(", ");
// chunking configuration & endpoints
const DEFAULT_CHUNK_SIZE = 10 * 1024 * 1024; // 10MB per chunk (safe)
const CHUNK_UPLOAD_PATH = "/records/upload/chunk";
const FINALIZE_PATH = "/records/upload";
const isValidUUID = (s) => !!s && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(s);
async function uploadChunkBlob(blob, fileName, chunkIndex, totalChunks, uploadUuid) {
    const fd = new FormData();
    fd.append("chunk", blob, fileName); // server expects 'chunk'
    fd.append("filename", fileName);
    fd.append("chunk_index", String(chunkIndex));
    fd.append("total_chunks", String(totalChunks));
    fd.append("upload_uuid", uploadUuid);
    const res = await apiClient.post(CHUNK_UPLOAD_PATH, fd, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
}
async function uploadFileInChunks(file, uploadUuid, onProgress, chunkSize = DEFAULT_CHUNK_SIZE) {
    const totalChunks = Math.max(1, Math.ceil(file.size / chunkSize));
    for (let i = 0; i < totalChunks; i++) {
        const start = i * chunkSize;
        const end = Math.min(start + chunkSize, file.size);
        const blob = file.slice(start, end);
        await uploadChunkBlob(blob, file.name, i, totalChunks, uploadUuid);
        if (onProgress)
            onProgress(i + 1, totalChunks);
    }
    return totalChunks;
}
const UploadForm = ({ mediaType, onDone, onCancel }) => {
    const [form] = Form.useForm();
    const [categories, setCategories] = useState([]);
    const [loadingCats, setLoadingCats] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    // fetch categories
    useEffect(() => {
        let mounted = true;
        const fetchCats = async () => {
            setLoadingCats(true);
            try {
                const res = await apiClient.get("/categories/");
                if (mounted)
                    setCategories(res.data || []);
            }
            catch (err) {
                console.error("Failed to load categories", err);
                message.error("Unable to load categories (check backend/proxy).");
            }
            finally {
                if (mounted)
                    setLoadingCats(false);
            }
        };
        fetchCats();
        return () => { mounted = false; };
    }, []);
    const acceptForType = (type) => {
        const exts = EXTENSIONS_BY_TYPE[type] || [];
        return exts.join(",");
    };
    const validateFile = (file, type) => {
        const exts = EXTENSIONS_BY_TYPE[type] || [];
        const name = (file.name || "").toLowerCase();
        const matchesExt = exts.some(e => name.endsWith(e));
        if (matchesExt)
            return true;
        if (type === "audio" && file.type?.startsWith("audio/"))
            return true;
        if (type === "video" && file.type?.startsWith("video/"))
            return true;
        if (type === "image" && file.type?.startsWith("image/"))
            return true;
        if (type === "document" && (file.type === "application/pdf" || file.type.includes("offic")))
            return true;
        if (type === "text" && file.type?.startsWith("text/"))
            return true;
        return false;
    };
    const onFileChange = (e) => {
        const f = e.target.files && e.target.files[0];
        if (!f) {
            setSelectedFile(null);
            return;
        }
        if (!validateFile(f, mediaType)) {
            message.error(`File "${f.name}" is not allowed for ${mediaType}. Allowed: ${humanize(EXTENSIONS_BY_TYPE[mediaType] || [])}`);
            e.currentTarget.value = ""; // reset input
            setSelectedFile(null);
            return;
        }
        setSelectedFile(f);
        message.success(`Selected file: ${f.name}`);
    };
    // clear selected file if mediaType changed and mismatch
    useEffect(() => {
        if (selectedFile && !validateFile(selectedFile, mediaType)) {
            setSelectedFile(null);
            message.info("Cleared previously selected file because it doesn't match the chosen content type.");
        }
        form.setFieldsValue({ media_type: mediaType });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mediaType]);
    const storedUserId = typeof window !== "undefined" ? localStorage.getItem("user_id") : null;
    const onFinish = async (values) => {
        // basic validations
        if (!values.title)
            return message.error("Title is required");
        if (!values.category_id)
            return message.error("Category is required");
        if (!values.language)
            return message.error("Language is required");
        if (!values.release_rights)
            return message.error("Release rights is required");
        // find candidate user id (form -> localStorage)
        const candidateUserId = (values.user_id && String(values.user_id).trim()) || storedUserId || "";
        if (!candidateUserId) {
            return message.error("User id missing. Please login or provide a valid user id.");
        }
        if (!isValidUUID(candidateUserId)) {
            return message.error("User id is not a valid UUID. Please check and try again.");
        }
        // for non-text types, require a selected file
        if (mediaType !== "text" && !selectedFile) {
            return message.error("Please select a file to upload for this content type.");
        }
        setUploading(true);
        const loadingKey = `upload-${Date.now()}`;
        message.loading({ content: "Preparing upload...", key: loadingKey, duration: 0 });
        try {
            // generate upload uuid (shared for chunks + finalize)
            const uploadUuid = (crypto && crypto.randomUUID) ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
            let totalChunksForFinalize = 0;
            // if there's a selected file, upload it in chunks first
            if (selectedFile) {
                message.info("Uploading file in chunks...", 2);
                // progress updater
                const onProgress = (done, total) => {
                    message.loading({ content: `Uploading chunks ${done}/${total}...`, key: loadingKey, duration: 0.5 });
                };
                // upload chunks (this will throw if any chunk upload fails)
                totalChunksForFinalize = await uploadFileInChunks(selectedFile, uploadUuid, onProgress);
                // small delay to ensure user sees the last progress update
                message.loading({ content: `Uploaded all chunks (${totalChunksForFinalize}). Finalizing...`, key: loadingKey, duration: 1.2 });
            }
            else {
                // no file (text-only). We'll finalize with total_chunks = 0.
                totalChunksForFinalize = 0;
                message.loading({ content: "Finalizing text-only record...", key: loadingKey, duration: 0.8 });
            }
            // build finalization form data (do NOT include the full file here — server combines chunks)
            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("description", values.description || "");
            formData.append("category_id", values.category_id);
            formData.append("user_id", candidateUserId);
            formData.append("media_type", mediaType); // string (backend expects enum-like value)
            formData.append("upload_uuid", uploadUuid);
            formData.append("filename", selectedFile ? selectedFile.name : (values.filename || "untitled.txt"));
            formData.append("total_chunks", String(totalChunksForFinalize));
            formData.append("language", values.language);
            formData.append("release_rights", values.release_rights);
            if (values.latitude)
                formData.append("latitude", String(values.latitude));
            if (values.longitude)
                formData.append("longitude", String(values.longitude));
            if (values.creator)
                formData.append("creator", values.creator);
            // include text content if text type
            if (mediaType === "text" && values.text_content) {
                formData.append("text_content", values.text_content);
            }
            // Call finalization endpoint
            const res = await apiClient.post(FINALIZE_PATH, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            message.success({ content: "Upload finished", key: loadingKey, duration: 2 });
            console.log("upload response", res.data);
            form.resetFields();
            setSelectedFile(null);
            if (onDone)
                onDone(res.data);
        }
        catch (err) {
            console.error("Upload error", err);
            // show helpful server message if available
            const data = err?.response?.data;
            if (data) {
                // pydantic style list errors
                if (Array.isArray(data.detail)) {
                    const first = data.detail[0];
                    message.error(first?.msg || JSON.stringify(first));
                }
                else if (data.errors) {
                    // custom error format (your earlier example)
                    const first = data.errors?.[0];
                    message.error(first?.message || data.message || "Upload failed");
                }
                else if (data.detail || data.message) {
                    message.error(data.detail || data.message);
                }
                else {
                    message.error(JSON.stringify(data));
                }
            }
            else {
                message.error(err?.message || "Upload failed");
            }
        }
        finally {
            setUploading(false);
        }
    };
    return (_jsxs("div", { style: { maxWidth: 820, margin: "0 auto", padding: 20 }, children: [_jsx(Title, { level: 3, children: "Upload Content" }, void 0), _jsxs(Form, { form: form, layout: "vertical", onFinish: onFinish, initialValues: {
                    language: "NA",
                    release_rights: "creator",
                    media_type: mediaType,
                    user_id: storedUserId || undefined,
                }, children: [_jsx(Form.Item, { name: "title", label: "Title", rules: [{ required: true }], children: _jsx(Input, { placeholder: "Title" }, void 0) }, void 0), _jsx(Form.Item, { name: "description", label: "Description", children: _jsx(TextArea, { rows: 4, placeholder: "Description (optional)" }, void 0) }, void 0), _jsx(Form.Item, { name: "category_id", label: "Category", rules: [{ required: true }], children: _jsx(Select, { loading: loadingCats, placeholder: "Select category", children: categories.map(c => (_jsx(Select.Option, { value: c.id, children: c.name ?? c.title ?? c.id }, c.id))) }, void 0) }, void 0), _jsxs("div", { style: { marginBottom: 12, color: '#444' }, children: [_jsx("strong", { children: "Content type:" }, void 0), " ", mediaType] }, void 0), mediaType === "text" && (_jsx(Form.Item, { name: "text_content", label: "Text content (optional)", children: _jsx(TextArea, { rows: 6, placeholder: "Paste or type text content (optional) \u2014 you can also upload a file below" }, void 0) }, void 0)), _jsx(Form.Item, { label: `File upload ${mediaType !== "text" ? "(required)" : "(optional)"}`, children: _jsxs(Space, { direction: "vertical", children: [_jsx("input", { type: "file", accept: acceptForType(mediaType), onChange: onFileChange, style: { display: "block" } }, void 0), _jsxs("div", { style: { fontSize: 12, color: "#666" }, children: ["Allowed: ", humanize(EXTENSIONS_BY_TYPE[mediaType] || [])] }, void 0), selectedFile && (_jsxs("div", { style: { fontSize: 13 }, children: ["Selected: ", _jsx("strong", { children: selectedFile.name }, void 0), " (", Math.round(selectedFile.size / 1024), " KB)"] }, void 0))] }, void 0) }, void 0), _jsx(Form.Item, { name: "language", label: "Language", rules: [{ required: true }], children: _jsx(Select, { placeholder: "Select language", children: LANGUAGES.map(l => (_jsx(Select.Option, { value: l, children: l.toUpperCase() }, l))) }, void 0) }, void 0), _jsx(Form.Item, { name: "release_rights", label: "Release Rights", rules: [{ required: true }], children: _jsxs(Radio.Group, { children: [_jsx(Radio, { value: "creator", children: "This work is created by me and free to use" }, void 0), _jsx(Radio, { value: "others", children: "Others (attribution / restricted)" }, void 0), _jsx(Radio, { value: "downloaded", children: "Downloaded / not sure" }, void 0), _jsx(Radio, { value: "NA", children: "NA" }, void 0)] }, void 0) }, void 0), _jsx(Form.Item, { name: "creator", label: "Creator (optional)", children: _jsx(Input, { placeholder: "Creator name (optional)" }, void 0) }, void 0), _jsx(Form.Item, { name: "user_id", label: "User id (optional)", children: _jsx(Input, { placeholder: "user id (optional, will default to current user)" }, void 0) }, void 0), _jsx(Form.Item, { children: _jsxs(Space, { children: [_jsx(Button, { type: "primary", htmlType: "submit", loading: uploading, children: "Upload" }, void 0), _jsx(Button, { onClick: () => {
                                        form.resetFields();
                                        setSelectedFile(null);
                                        if (onCancel)
                                            onCancel();
                                    }, children: "Reset" }, void 0)] }, void 0) }, void 0)] }, void 0)] }, void 0));
};
export default UploadForm;
