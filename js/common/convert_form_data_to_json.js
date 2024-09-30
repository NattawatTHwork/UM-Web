function convertFormDataToJson(formData) {
    const jsonData = {};
    formData.forEach(function (value, key) {
        jsonData[key] = value;
    });
    return jsonData;
}
