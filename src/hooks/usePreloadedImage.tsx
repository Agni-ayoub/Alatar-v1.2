import React, { useEffect, useState } from "react";

interface PreloadedImageProps {
    src: string;
    alt?: string;
}

/**
 * Custom hook to preload an image and return its loading state and element.
 *
 * @prop {Object} props - The properties object.
 * @prop {string} src - The source URL of the image to preload.
 * @prop {string} alt - The alt text for the image.
 * @returns {Object} An object containing the loading state and the image element.
 * @returns {boolean} returns.loaded - A boolean indicating whether the image has loaded.
 * @returns {JSX.Element} returns.imageElement - The image element if loaded, otherwise a loading indicator.
 *
 * @example
 * const { loaded, imageElement } = usePreloadedImage({ src: 'image.jpg', alt: 'An image' });
 * 
 * return (
 *   <div>
 *     {imageElement}
 *   </div>
 * );
 */

const usePreloadedImage = ({ src, alt } : PreloadedImageProps) : {loaded : boolean, imageElement : React.JSX.Element}  => {
    const [loaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.onload = () => setLoaded(true);
    }, [src]);

    const imageElement = loaded ? <img src={src} alt={alt} /> : <span className="button-loader" />;

    return { loaded, imageElement };
};

export default usePreloadedImage;