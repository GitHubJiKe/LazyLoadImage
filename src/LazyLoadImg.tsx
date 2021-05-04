import React, { CSSProperties, useEffect, useRef } from "react";

interface ILazyLoadImgProps {
    src: string;
    className?: string;
    style?: CSSProperties;
    alt?: string;
    wait?: number;
    defaultSrc?: string;
}

export default function LazyLoadImg({
    src,
    alt,
    className,
    style,
    wait = 1000,
    defaultSrc = "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F0903b3b5abe415d86ff1531ac6d3af56a5c0fe991d8d4-LGb5q6_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1622734005&t=7750998010133d037a1eb92508ce74c5",
}: ILazyLoadImgProps) {
    const imgEle = useRef<HTMLImageElement>(null);
    function lazyLoadImage() {
        if (imgEle.current) {
            const bound = imgEle.current.getBoundingClientRect();
            if (bound) {
                if (bound.top < window.innerHeight) {
                    // it means the img element is in visible area,
                    // then this time you can set img's src dynamic
                    if (imgEle.current.src === defaultSrc) {
                        imgEle.current.src = src;
                    }
                }
            }
        }
    }

    useEffect(() => {
        lazyLoadImage(); // try to set first batch imgs to show
        // on scroll event
        document.addEventListener("scroll", throttle(lazyLoadImage, wait));
    }, []);
    return (
        <img
            className={className}
            style={style}
            ref={imgEle}
            alt={alt}
            src={defaultSrc}
        />
    );
}

function throttle(func: (...args: any[]) => void, wait?: number) {
    let timer: any = null;
    return function (...args) {
        if (timer) {
            return;
        }

        const ctx = this;

        setTimeout(() => {
            func.apply(ctx, args);
            clearTimeout(timer);
            timer = null;
        }, wait);
    };
}
