import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
  Card,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Heart, HeartFill } from "react-bootstrap-icons";
import { addToCart } from "../redux/cartSlice";
import { addToWishlist, removeFromWishlist } from "../redux/wishlistSlice";
import PaginationComponent from "../components/common/PaginationComponent";

const CategoryPage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items || []);

  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("newest");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // 🔹 Dummy data generator
  const dummyProducts = Array.from({ length: 45 }).map((_, i) => ({
    id: (i + 1).toString(), // ✅ use "id" instead of "_id"
    name: `${slug} Product ${i + 1}`,
    image: `https://via.placeholder.com/300x300?text=${slug}+${i + 1}`,
    price: Math.floor(Math.random() * 1000 + 200),
    oldPrice: Math.floor(Math.random() * 1000 + 300),
    rating: Math.floor(Math.random() * 5) + 1,
    category: slug,
    sale: Math.random() > 0.7,
  }));

  // 🔹 Sorting logic
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      let sorted = [...dummyProducts];
      if (sortBy === "price-asc") sorted.sort((a, b) => a.price - b.price);
      if (sortBy === "price-desc") sorted.sort((a, b) => b.price - a.price);
      if (sortBy === "rating") sorted.sort((a, b) => b.rating - a.rating);
      setProducts(sorted);
      setLoading(false);
      setCurrentPage(1);
    }, 500);
  }, [slug, sortBy]);

  // 🔹 Pagination setup
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIdx = (currentPage - 1) * productsPerPage;
  const paginatedProducts = products.slice(startIdx, startIdx + productsPerPage);

  // 🔹 Wishlist toggling
  const isInWishlist = (id) => wishlistItems.some((item) => item.id === id);

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) dispatch(removeFromWishlist(product.id));
    else dispatch(addToWishlist(product));
  };

  return (
    <Container className="my-4">
      {/* 🔹 Top section: title + sorting */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3">
        <h4 className="fw-bold text-capitalize mb-3 mb-md-0">
          {slug} Category
        </h4>

        <Form.Select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{ width: "200px" }}
        >
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </Form.Select>
      </div>

      {/* 🔹 Loading Spinner */}
      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          {/* 🔹 Product grid */}
          <Row>
            {paginatedProducts.map((product) => (
              <Col
                key={product.id}
                xs={6}
                sm={6}
                md={4}
                lg={3}
                className="mb-4"
              >
                <Card className="shadow-sm border-0 h-100 position-relative card-hover">
                  <div className="position-relative">
                    <Link to={`/product/${product.id}`}>
                      <Card.Img
                        variant="top"
                        src={product.image}
                        className="rounded-top"
                      />
                    </Link>

                    <Button
                      variant="light"
                      className="position-absolute top-0 end-0 m-2 rounded-circle shadow-sm"
                      onClick={() => toggleWishlist(product)}
                    >
                      {isInWishlist(product.id) ? (
                        <HeartFill color="red" size={18} />
                      ) : (
                        <Heart color="gray" size={18} />
                      )}
                    </Button>
                  </div>

                  <Card.Body className="text-center">
                    <Link
                      to={`/product/${product.id}`}
                      className="text-decoration-none text-dark"
                    >
                      <Card.Title className="fs-6 fw-semibold text-truncate">
                        {product.name}
                      </Card.Title>
                    </Link>

                    <div className="d-flex justify-content-center align-items-center gap-2">
                      <span className="fw-bold text-dark">
                        ৳{product.price.toFixed(2)}
                      </span>
                      <span className="text-muted text-decoration-line-through small">
                        ৳{product.oldPrice.toFixed(2)}
                      </span>
                    </div>

                    <Button
                      variant="dark"
                      className="mt-2 w-100"
                      onClick={() => dispatch(addToCart(product))}
                    >
                      Add to Cart
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* 🔹 Pagination */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-4">
              <PaginationComponent
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={(p) => setCurrentPage(p)}
              />
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default CategoryPage;
