import "./MainComponent.css";

export default function MainComponent() {
  return (
    <div className="background-image">
      <div className="background-shade">
        <div className="main-center">
          <div className="text-white text-center">
            <h2>AUTOMATE YOUR APPOINTMENT SCHEDULING TASKS</h2>
            <h4>
              Streamline your business scheduling with a tool that tackles
              custom scheduling needs.
            </h4>
            <button className="btn btn-danger">
              Book Now <span className="bi bi-chevron-right"></span>
            </button>
            <div className="mt-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
