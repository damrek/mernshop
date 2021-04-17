import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import React from 'react';
import { Link } from 'react-router-dom';

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  return (
    pages > 1 && (
      <Pagination
        page={page}
        count={pages}
        color="primary"
        renderItem={(item) => (
          <PaginationItem
            key={item.page}
            component={Link}
            page={item.page}
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${item.page}`
                  : `/page/${item.page}`
                : `/admin/productlist/${item.page}`
            }
            {...item}
          />
        )}
      ></Pagination>
    )
  );
};

export default Paginate;
