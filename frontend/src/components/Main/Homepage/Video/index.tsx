const Video = () => {
    return (
        <article>
            {/* <video width={"100%"} height={"100%"} title="Barber" autoPlay>
                <source
                    src="https://www.youtube.com/embed/8pWtdanVz3I?controls=0"
                    type="video/mp4"
                />
                <source
                    src="https://www.youtube.com/embed/8pWtdanVz3I?controls=0"
                    type="video/ogg"
                />
                Your browser does not support HTML video.
            </video> */}
            <iframe
                width={"100%"}
                height={"100%"}
                src="https://www.youtube.com/embed/8pWtdanVz3I?controls=0&autoplay=1&mute=1&loop=1"
                title="YouTube video player"
                allow="autoplay"
            ></iframe>
        </article>
    );
};

export default Video;
