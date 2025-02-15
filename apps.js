const button=document.querySelector('#rec-button')

button.addEventListener('click',()=>{
    Notification.requestPermission().then((perm)=>{
        if(perm === 'granted'){
            console.log('clicked')
            const notify=new Notification("First Notification",{
                body:'Hello Notification',
                icon:'/images/icon.jpg'
            });
        }else{
            console.log('permission denied');
        }
    })
})