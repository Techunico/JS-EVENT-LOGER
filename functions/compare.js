export const compareNestedStructures = (obj1, obj2, currentPath, differences) => {
    for (const key in obj1) {
        if (obj1.hasOwnProperty(key)) {
            const newPath = currentPath ? `${currentPath}.${key}` : key;

            if (Array.isArray(obj1[key])) {
                if (!arraysAreEqual(obj1[key], obj2[key])) {
                    differences[newPath] = {
                        obj1: obj1[key],
                        obj2: obj2[key]
                    };
                }
            } else if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
                compareNestedStructures(obj1[key], obj2[key], newPath, differences);
            } else if (!obj2.hasOwnProperty(key)) {
                differences[newPath] = {
                    obj1: obj1[key],
                    obj2: undefined
                };
            } else if (obj1[key] !== obj2[key]) {
                differences[newPath] = {
                    obj1: obj1[key],
                    obj2: obj2[key]
                };
            }
        }
    }

    for (const key in obj2) {
        if (obj2.hasOwnProperty(key)) {
            const newPath = currentPath ? `${currentPath}.${key}` : key;

            if (!obj1.hasOwnProperty(key)) {
                differences[newPath] = {
                    obj1: undefined,
                    obj2: obj2[key]
                };
            }
        }
    }
};

const arraysAreEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) {
        return false;
    }

    for (let i = 0; i < arr1.length; i++) {
        if (typeof arr1[i] === 'object' && typeof arr2[i] === 'object') {
            if (!objectsAreEqual(arr1[i], arr2[i])) {
                return false;
            }
        } else if (arr1[i] !== arr2[i]) {
            return false;
        }
    }

    return true;
};

const objectsAreEqual = (obj1, obj2) => {
    for (const key in obj1) {
        if (obj1.hasOwnProperty(key)) {
            if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
                if (!objectsAreEqual(obj1[key], obj2[key])) {
                    return false;
                }
            } else if (obj1[key] !== obj2[key]) {
                return false;
            }
        }
    }

    return true;
};