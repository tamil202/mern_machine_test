const Pagination = (prop) => {
  let page = [];
  for (let i = 1; i < prop.totalpost / 3; i++) {
    page.push(i);
  }
  return (
    <div className="flex justify-center mt-10 space-x-5 ">
      {page.map((page, i) => {
        return (
            <button
              key={i}
              className="bg-black text-white  rounded-full px-3 py-1 "
              onClick={() => prop.setcurrentpage(page)}
            >
              <span className=""> {page}</span>
            </button>
        );
      })}
    </div>
  );
};

export default Pagination;
