<script>
    import Profile from '../profile/profile.svelte'
    import {createEventDispatcher, onMount} from "svelte";
    import Cookies from "universal-cookie";
    import {Link} from "svelte-routing";
    import styles from "./header.css";

    const cookies = new Cookies();
    let loggedIn = false;
    let isAdmin = false;
    let searchValue;
    let user;

    onMount(async () => {
        const res = await fetch('http://localhost:3001/api/users/me', {headers: {authorization: `Bearer ${cookies.get("token")}`}});
        if (res.ok) {
            user = await res.json();
            loggedIn = true;

            if (user.access === 1) {
                isAdmin = true
            }
            loadUser(user, loggedIn);
        }
    });

    function logout(event) {
        loggedIn = false;
        isAdmin = false;
        user = undefined;
    }

    const pageDispatch = createEventDispatcher();


    const userDispatch = createEventDispatcher();

    function loadUser(user, loggedIn) {
        userDispatch('login', {
            loggedIn: loggedIn,
            user: user
        });
    }

</script>


<header>
    <div class="header">
        <Link to="/">
            <div class="header-name">
                <img src="/images/shopavatar.jpg" alt="logo goes here">
                <span>GAMESHOP</span>
            </div>
        </Link>


        <nav class="navbar">
            <div class="search">
                <input type="text" placeholder="Search..." bind:value={searchValue}/>
            </div>
            <Link to="/admin">
                <button class="button" class:adminHidden={!isAdmin}> AdminPanel</button>
            </Link>

            {#if !loggedIn}
                <a
                        class="button"
                        href="https://discord.com/api/oauth2/authorize?client_id=1010914040584871966&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fapi%2Flogin%2Fcallback&response_type=code&scope=identify"
                >
                    login
                </a>
            {:else}
                <Profile on:logout={logout} name={user.userName} id={user.userid} imgId={user.userImageId}/>
            {/if}
        </nav>
    </div>
</header>


