<script>
    import styles from "./editor.css";
    import Cookies from "universal-cookie";

    export let item;
    export let user;
    let title = item.title;
    let description = item.description;
    let imageIds = item.imageIds;
    let code = item.code;
    let price = item.price;
    let tags = item.tags.join(', ');
    let type = item.type;
    let platforms = item.platforms;
    const cookies = new Cookies();
    const allplatforms = ["SWITCH", "PS4", "XBOX", "PC"];

    function removeFile(link) {
        if (imageIds.includes(link)) {
            imageIds.splice(imageIds.indexOf(link), 1);
            imageIds = imageIds;
        }
    }

    function reset() {
        title = item.title;
        description = item.description;
        imageIds = item.imageIds;
        imageIds = imageIds
        code = item.code;
        price = item.price;
        tags = item.tags.join(', ');
        type = item.type;
        platforms = item.platforms;
    }
    async function newItemFile(e) {
        let formData = new FormData();
        formData.append("file", e.target.files[0]);
        const res = await fetch(`http://localhost:3001/api/images/products`, {
            mode: "cors",
            method: "POST",
            body: formData
        });
        if (res.ok) {
            const fileName = await res.text();
            imageIds.push(fileName);
            imageIds = imageIds;
        }
    }
    async function submit(){
        switch (item.code){
            case -1:{
                const res = await fetch(`http://localhost:3001/api/products`, {
                    method: "POST",
                    headers: {
                        authorization: `Bearer ${cookies.get("token")}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        title,
                        description,
                        imageIds,
                        price,
                        tags: tags.split(", "),
                        type,
                        platforms
                    })
                });
                if(res.ok){
                    alert("SUCCESS");
                }
                break;
            }
            default: {
                const res = await fetch(`http://localhost:3001/api/products/${item.code}`, {
                    method: "PUT",
                    headers: {
                        authorization: `Bearer ${cookies.get("token")}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        title,
                        description,
                        imageIds,
                        price,
                        tags: tags.split(", "),
                        type,
                        platforms
                    })
                });
                if(res.ok){
                    alert("SUCCESS");
                }
                break;
            }
        }


    }

</script>
<div class="editor">
    <div class="editpage">
        <input type="text" bind:value={title}/>
        <textarea bind:value={description}/>
        <input type="text" bind:value={price}/>
        <input type="text" bind:value={tags}/>
        <select bind:value={type}>
            {#each ["Digital", "Physical"] as type}
                <option value={type}>
                    {type}
                </option>
            {/each}
        </select>
        {#each allplatforms as platform}
            <label>
                <input type=checkbox bind:group={platforms} value={platform}>
                {platform}
            </label>
        {/each}
        <div class="image-ids-bar">
            {#each imageIds as link}
                <div class="image-in-bar" on:click={()=>removeFile(link)}>
                    <img src={link.includes("http") ? link : `http://localhost:3001/api/images/assets/${link}`}
                         alt="No comments"/>
                </div>
            {/each}
        </div>
        <div class="buttons">
            <label for="imageloader">Add File</label>
            <input style="display: none" id="imageloader" type="file" on:change={newItemFile}>
            <button on:click={submit}>Ok</button>
            <button on:click={reset}>Cancel</button>
        </div>
    </div>
</div>
