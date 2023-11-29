import Image from "next/image";

const Upcoming = () => {
  return (
    <div className="card lg:h-[400px] lg:card-side bg-base-100 rounded shadow-xl container mb-10">
      <div
        className="hero lg:w-[50%]"
        style={{
          backgroundImage: "url(/assets/images/slide-4.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="">
            <h1 className="mb-5 text-5xl font-bold text-slate-50">Vacum Cleaning</h1>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
        </div>
      </div>
      <div className="card-body">
        <figure>
          <Image
            width={600}
            height={600}
            src="/assets/images/comming-soon.png"
            alt="upcoming-service"
            className="h-[200px] lg:h-[400px] object-fill"
          />
        </figure>
      </div>
    </div>
  );
};

export default Upcoming;
