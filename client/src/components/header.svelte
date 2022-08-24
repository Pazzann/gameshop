<script>
    import Profile from './profile.svelte'
    import {createEventDispatcher, onMount} from "svelte";

    let loggedIn = false;
    let isAdmin = false;
    let searchValue;
    let user;

    onMount(async () => {
        const res = await fetch('http://localhost:3001/api/auth/user', {credentials: "include"});
        if (res.ok) {
            const data = await res.json();
            loggedIn = data.loggedIn;
            user = data.user;
            if(user.access === 1){
                isAdmin = true
            }
            loadUser(user, loggedIn);
        }
    });

    function logout(event) {
        loggedIn = false;
        isAdmin = false;
    }

    const pageDispatch = createEventDispatcher();


    function changePageToMain() {
        pageDispatch('changePage', {
            index: 0
        });
    }

    function changePageToAdmin() {
        pageDispatch('changePage', {
            index: 1
        });
    }

    const userDispatch = createEventDispatcher();
    function loadUser(user, loggedIn){
        userDispatch('login', {
            loggedIn: loggedIn,
            user: user
        });
    }

</script>


<header>
    <div class="header">
        <div class="header-name" on:click={changePageToMain}>
            <img src="http://localhost:3001/api/images/shopavatar.jpg" alt="logo goes here">
            <span>GAMESHOP</span>
        </div>


        <nav class="navbar">
            <div class="search">
                <input type="text" placeholder="Search..." bind:value={searchValue}/>
            </div>
            <button   class="button" on:click={changePageToAdmin} class:adminHidden={!isAdmin}> AdminPanel</button>
            {#if !loggedIn}
                <a
                        class="button"
                        href="https://discord.com/api/oauth2/authorize?client_id=1010914040584871966&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fapi%2Fauth%2Fcallback&response_type=code&scope=identify"
                >
                    login
                </a>
            {:else}
                <Profile on:logout={logout} name={user.username} id={user.userid} imgId={user.userImageId}/>
            {/if}
        </nav>
    </div>
</header>


<style>
    .adminHidden{
        visibility: hidden;
    }
    .button {
        border: solid 2px white;
        display: flex;
        align-items: center;
        font-family: Comfortaa;
        text-decoration: none;
        border-radius: 8px;
        min-height: 44px;
        padding: 0 2rem;
        background: gray;
        color: white;
        font-size: 20px;
        transition: all 320ms;
    }

    .button:hover {
        transform: scale(1.2);
        background: #000517;
        cursor: pointer;
    }

    .navbar {
        display: flex;
        align-items: center;
        width: 50%;
        gap: 20px;
    }

    .search {
        width: 100%;
    }

    .search > input:hover {
        background: #525252;
    }

    .search > input {

        width: 100%;
        min-height: 44px;
        background:  #1f1f1f;
        border-radius: 9px;
        border: none;
        padding: 0 20px;
        font-size: 16px;
        color: #ffffff;
        transition: background-color 0.4s ease-in-out;
    }

    .search > input:focus {
        background: #ffffff;
        outline: none;
        color: black;
    }

    @font-face {
        font-family: ubuntu-name;
        src: url("../fonts/UbuntuCondensed-Regular.ttf");
    }

    .header {
        height: 90px;
        width: 100%;
        background: black;
        color: aliceblue;
        display: flex;
        justify-content: space-between;
        padding-left: 30px;
        padding-right: 30px;
        align-items: center;
    }

    .header-name {
        display: flex;
        align-items: center;
        transition: all 320ms;
    }

    .header-name > img {
        width: 60px;
        height: 60px;
        border-radius: 20px;
        margin-right: 10px;
    }

    .header-name:hover {
        transform: scale(1.1);
        cursor: pointer;
    }

    .header-name > span {
        font-family: ubuntu-name;
        font-size: 40px;
    }
</style>