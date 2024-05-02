import React from "react";

const DashhboardCard = ({ title, total }) => {
  return (
    <div className="mb-5 col-xl-4 col-md-4">
      <div className="py-2 shadow card border-left-primary h-100">
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="mr-2 col">
              <div className="mb-2 text-xs font-weight-bold text-primary text-uppercase">
                {title}
                <br />
              </div>
              <div className="mb-0 text-gray-800 h2 font-weight-bold">
                {total}
              </div>
            </div>
            <div className="col-auto">
              <i className="text-gray-300  fa fa-money fa-2x"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashhboardCard;
