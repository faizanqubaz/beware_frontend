import './mapcontainer.css';

const Map = () => {
  return (
    <div className="map-container">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d84144.55643043155!2d74.8233!3d36.4919!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m3!3e6!4m0!4m0!5e1!3m2!1sen!2s!4v1633445826917!5m2!1sen!2s"
        allowFullScreen=""
        frameBorder="0"
        aria-hidden="false"
        tabIndex="0"
      ></iframe>
    </div>
  );
};

export default Map;
