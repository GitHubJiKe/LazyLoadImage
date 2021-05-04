import React, { useState, useEffect } from "react";
import LazyLoadImg from "./LazyLoadImg";
import { createApi } from "unsplash-js";

const ACCESS_KEY =
    "******";

const api = createApi({
    // Don't forget to set your access token here!
    // See https://unsplash.com/developers
    accessKey: ACCESS_KEY,
});

export default function App() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);

    useEffect(() => {
        api.search
            .getPhotos({ query: "cat", orientation: "landscape", page })
            .then((res) => {
                const d = res.response.results;
                setData(data.concat(d));
            })
            .catch((err) => {
                console.error(err);
            });
    }, [page]);

    useEffect(() => {
        document.addEventListener("scroll", function () {
            const clientHeight =
                document.documentElement.scrollTop === 0
                    ? document.body.clientHeight
                    : document.documentElement.clientHeight;
            // 滚动区域高度
            const scrollTop =
                document.documentElement.scrollTop === 0
                    ? document.body.scrollTop
                    : document.documentElement.scrollTop;
            // 网页全文高度
            const scrollHeight =
                document.documentElement.scrollTop === 0
                    ? document.body.scrollHeight
                    : document.documentElement.scrollHeight;
            //当滚动高度不等于0 说明有滚动，而且 可见区域高度+滚动部分高度 = 网页全文的高度 就代表滚动到底部了
            if (scrollTop != 0 && clientHeight + scrollTop === scrollHeight) {
                setPage((p) => ++p);
            }
        });
    }, []);

    return (
        <div
            id="app"
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <h1
                style={{
                    textAlign: "center",
                    position: "fixed",
                    top: 0,
                    backgroundColor: "#eee",
                    width: "100%",
                }}
            >
                lazy load image, when you scroll to bottom, you will see more
                cats
            </h1>
            {data.map((d, idx) => {
                return (
                    <LazyLoadImg
                        key={idx}
                        src={d.urls.small}
                        alt=""
                        style={{ width: 600, height: 600 }}
                    />
                );
            })}
        </div>
    );
}
