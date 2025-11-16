// src/api/records.api.ts
import apiClient from './auth.api';
export const getCategories = () => {
    // returns axios response for GET /v1/categories/
    return apiClient.get('/categories/');
};
/**
 * Upload a single chunk.
 * chunkData should be a File or Blob.
 */
export const uploadChunk = (params) => {
    const { chunkFile, filename, chunkIndex, totalChunks, uploadUuid } = params;
    const fd = new FormData();
    fd.append('chunk', chunkFile);
    fd.append('filename', filename);
    fd.append('chunk_index', String(chunkIndex));
    fd.append('total_chunks', String(totalChunks));
    fd.append('upload_uuid', uploadUuid);
    return apiClient.post('/records/upload/chunk', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};
/**
 * Finalize upload and create record.
 * Fields depend on backend - include user_id, category_id, media_type, upload_uuid, filename, total_chunks etc.
 */
export const finalizeUpload = (payload) => {
    const fd = new FormData();
    fd.append('title', payload.title);
    if (payload.description)
        fd.append('description', payload.description);
    fd.append('category_id', payload.category_id);
    fd.append('user_id', payload.user_id);
    fd.append('media_type', payload.media_type);
    fd.append('upload_uuid', payload.upload_uuid);
    fd.append('filename', payload.filename);
    fd.append('total_chunks', String(payload.total_chunks));
    fd.append('language', payload.language ?? 'en');
    return apiClient.post('/records/upload', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};
