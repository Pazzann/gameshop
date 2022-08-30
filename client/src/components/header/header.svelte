<script>
    import Profile from '../profile/profile.svelte'
    import {createEventDispatcher, onMount} from "svelte";
    import Cookies from "universal-cookie";
    import {Link} from "svelte-routing";
    import SearchItem from "../searchItem/searchItem.svelte";
    import styles from "./header.css";

    export let products;
    let searchedProducts = [];
    const cookies = new Cookies();
    let loggedIn = false;
    let isAdmin = false;
    let searchValue;
    let user;
    let timer;
    let val='';

    function debounce(v) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            handleSearchChange(v);
        }, 100);
    }

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

    const userDispatch = createEventDispatcher();

    function loadUser(user, loggedIn) {
        userDispatch('login', {
            loggedIn: loggedIn,
            user: user
        });
    }

    function handleSearchChange(e) {
        searchedProducts = products.filter(item => item.tags.some(tag => searchValue.toLowerCase().includes(tag.toLowerCase()))).splice(0, 5);

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
                <input type="text" on:keyup={({ target: { value } }) => debounce(value)} placeholder="Search..." bind:value={searchValue}/>
                {#if searchedProducts}
                    <div class="data">
                        {#each searchedProducts as sProduct}
                            <SearchItem item={sProduct}></SearchItem>
                        {/each}
                    </div>
                {/if}
            </div>


            <Link to="/admin">
                <button class="button" class:adminHidden={!isAdmin}>Admin</button>
            </Link>
            {#if !loggedIn}
                <a
                        class="button"
                        href="https://discord.com/api/oauth2/authorize?client_id=1010914040584871966&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fapi%2Flogin%2Fcallback&response_type=code&scope=identify"
                >
                    login
                </a>
            {:else}
                <Link to="/basket">
                    <button class="button">Basket</button>
                </Link>
                <Profile on:logout={logout} name={user.userName} id={user.userid} imgId={user.userImageId}/>
            {/if}
        </nav>
    </div>
</header>


