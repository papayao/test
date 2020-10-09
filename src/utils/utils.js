export let setTime = (time) => {
    let newTime = new Date(time)
    // return newTime.toLocaleString('chinese', { hour12: false })
    return newTime.getFullYear()+'-'+ (newTime.getMonth()+1)+'-'+newTime.getDate() + ' ' + newTime.getHours() + ":" + newTime.getMinutes() + ":" + newTime.getSeconds()
}