Navigation, srcoll to see animated background

```jsx
    const sections = [
        {
            title: "Home",
            route: "/"
        },
        {
            title: "TV Shows",
            route: "/tv-shows"
        },
        {
            title: "Movies",
            route: "/movies"
        },
        {
            title: "New & Popular",
            route: "/new&popular"
        },
        {
            title: "My List",
            route: "/favorites"
        }
    ];

    const [selectedIndex, setSelectedIndex] = React.useState(0);

    <Navigation
        sections={sections}
        selected={selectedIndex}
        onChange={setSelectedIndex}
    />

```