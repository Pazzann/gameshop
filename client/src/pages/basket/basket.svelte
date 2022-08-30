<script>
    import {onMount} from "svelte";
    import styles from "./basket.css";
    import BasketItem from "../../components/basketitem/basketItem.svelte";
    import Cookies from "universal-cookie";

    export let user;
    export let items;
    const cookies = new Cookies();
    let basketItems = [];
    let totalPrice = 0;
    let sort = "From Lowest";
    onMount(() => {
        basketItems = items.filter((item) => {
            return user.basket.includes(String(item.code));
        });
        basketItems.map(item => {
            totalPrice += item.price === "FREE" ? 0 : parseInt(item.price);
        });
    });

    async function removeBasket(e) {
        const res = await fetch(`http://localhost:3001/api/users/basket/${e.detail.code}`, {
            headers: {
                authorization: `Bearer ${cookies.get("token")}`
            },
            method: "DELETE"
        });
        if (res.ok) {
            const data = await res.json();
            if (data) {
                let item;
                let index = -1;
                basketItems.map((a, i) => {
                    if (a.code === e.detail.code) {
                        item = a;
                        index = i;
                    }
                })
                user.basket.splice(user.basket.indexOf(e.detail.code), 1);
                user = user;
                totalPrice -= item.price === "FREE" ? 0 : parseInt(item.price);
                basketItems.splice(index, 1);
                basketItems = basketItems;
            } else {
                alert("Login please!");
            }
        }
    }

    function sorting() {
        switch (sort) {
            case "From Lowest": {
                basketItems.sort((a, b)=>{
                    return a.price === "FREE"? true : b.price === "FREE"? true : parseInt(a.price) + parseInt(b.price);
                });
                basketItems = basketItems;
                sort="From Highest";
                break;
            }
            case "From Highest": {
                basketItems.sort((a, b)=>{
                    return a.price === "FREE"? false : b.price === "FREE"? false : parseInt(a.price) - parseInt(b.price);
                });
                basketItems = basketItems;
                sort="From Lowest";
                break;
            }
        }
    }
</script>
<div class="basket">
    <div class="basketpage">
        <div class="basketInfo">
            <span>Total price: {totalPrice}</span>
            <button class="sortButton" on:click={sorting}>{sort}</button>
        </div>
        {#each basketItems as itemInBasket}
            <BasketItem basketItem={itemInBasket} on:basketremove={removeBasket}></BasketItem>
        {/each}

    </div>
</div>



