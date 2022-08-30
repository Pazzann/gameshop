<script>
    import styles from "./author.css";
    export let user;
</script>


<div class="author">
    <img src="https://cdn.discordapp.com/avatars/{user.userid}/{user.userImageId}.png?size=128" alt="not loading" />
    <span>{user.userName}</span>
</div>