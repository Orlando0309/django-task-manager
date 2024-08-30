export function formDataToObject(formData,non_null) {
    const obj = {};
    formData.forEach((value, key) => {
        // If the key already exists in the object, handle it as an array
        if(non_null && (value!=="" || value.length!==0)){
            if (obj[key]) {
                if (Array.isArray(obj[key])) {
                    obj[key].push(value);
                } else {
                    obj[key] = [obj[key], value];
                }
            } else {
                obj[key] = value;
            }
        }
    });
    return obj;
}
