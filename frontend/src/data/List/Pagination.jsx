const Pagination = (prop) => {
  let page = [];
  for (let i = 1; i < prop.totalpost / 3; i++) {
    page.push(i);
  }
  return (
    <div className="flex justify-center mt-10 space-x-2 ">
      {page.map((page, i) => {
        return (
          <button
            className=""
            key={i}
            onClick={() => prop.setcurrentpage(page)}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
