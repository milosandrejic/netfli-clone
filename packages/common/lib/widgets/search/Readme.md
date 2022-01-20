```jsx
const [search, setSearch] = React.useState("");

<div
    style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        height: "100px",
        backgroundColor: "#000000",
        paddingRight: "30px"
    }}
>
    <Search
        value={search}
        onChange={setSearch}
    />
</div>
```