<script>
    import { createEventDispatcher } from 'svelte';
    export let id;
    export let name;
    export let imgId;

    const dispatch = createEventDispatcher();
    function logout(){
        fetch('http://localhost:3001/api/auth/logout' , {credentials: "include"});
        dispatch('logout', {
            text: 'Hello!'
        });
    }
</script>

<div class="profile" on:click={logout}>
    <img src="https://cdn.discordapp.com/avatars/{id}/{imgId}.png?size=128">
    <span>{name}</span>
</div>


<style>
    @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@700&display=swap');

    .profile{
        font-family: Comfortaa;
        font-size: 20px;
        display: flex;
        align-items: center;
        transition: all 320ms;
        background: gray;
        padding-right:  0.5rem;
        border-radius: 13px;
    }
    .profile>span{
        white-space: nowrap;
    }

    .profile>img{
        width: 44px;
        height: 44px;
        border-radius: 13px;
        margin-right: 20px;
    }
    .profile:hover{
        transform: scale(1.2);
        filter: grayscale(100%) brightness(40%) sepia(100%) hue-rotate(-50deg) saturate(600%) contrast(0.8);
        cursor: pointer;
    }

</style>