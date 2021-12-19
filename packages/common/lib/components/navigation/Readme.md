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

   const [transitionType, setTransitionType] = React.useState("natural");

    setInterval(() => {
        if (transitionType === "natural") {
            setTransitionType("backwards");
        } else {
            setTransitionType("natural");
        }
    }, 2000);

    <Navigation
        sections={sections}
        selected={0}
        onSelect={() => console.log("click")}
        transitionType={transitionType}
    />

```