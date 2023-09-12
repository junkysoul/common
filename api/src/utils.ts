export function arrayContainsAll(array, items){
    for(let i = 0; i < items.length; i++){
        if(!array.includes(items[i])){
            return false;
        }
    }
    return true;
}