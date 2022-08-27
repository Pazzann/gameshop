<script>
    import { createEventDispatcher } from 'svelte';
    import Cookies from 'universal-cookie';
    import styles from "./profile.css";
    const cookies = new Cookies();
    export let id;
    export let name;
    export let imgId;

    const dispatch = createEventDispatcher();
    function logout(){
        cookies.remove("token");
        dispatch('logout', {
            text: 'Hello!'
        });
    }
</script>

<div class="profile" on:click={logout}>
    <img src="https://cdn.discordapp.com/avatars/{id}/{imgId}.png?size=128" alt="sussy buka">
    <span>{name}</span>
</div>
