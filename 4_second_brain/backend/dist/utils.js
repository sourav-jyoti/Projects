//generate a random link for a shared item
export function random(len) {
    let options = "qwertyasdfghjklnm123456";
    let length = options.length;
    let ans = "";
    for (let i = 0; i < len; i++) {
        ans += options[Math.floor(Math.random() * length)];
    }
    return ans;
}
