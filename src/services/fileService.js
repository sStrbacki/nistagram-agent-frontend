export function createImageFormData(file) {
    const formData = new FormData();
    formData.append('image', file);
    return formData
}
