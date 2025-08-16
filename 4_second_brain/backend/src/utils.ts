
//generate a random link for a shared item

export function random(len: number):string {
    let options:string = "qwertyasdfghjklnm123456";
    let length:number = options.length;

    let ans:string = "";

    for(let i =0;i<len;i++){
        ans += options[Math.floor(Math.random()*length)]
    }

    return ans;
}