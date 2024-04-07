import React from "react";
import { useProducts } from "../redux/products/hooks";
import { Table, Dropdown } from "react-bootstrap";
import { IoEllipsisVertical } from "react-icons/io5";
import { TiDocument } from "react-icons/ti";
import EmptyBox from "../components/EmptyBox";
import { BiTrash } from "react-icons/bi";

export default function Products() {
  const { productsSize, products } = useProducts();
  console.log(products);
  if (productsSize === 0) return <EmptyBox />;
  return (
    <Table responsive>
      <thead>
        <tr>
          <th>Item Id</th>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Group</th>
          <th>More</th>
        </tr>
      </thead>
      <tbody>
        {products.map((item, i) => {
          return (
            <tr id={i} key={i} style={{ paddingInline: "1rem" }}>
              <td style={{ width: "70px" }}>{item.itemId}</td>
              <td>{item.itemName}</td>
              <td>{item.itemDescription}</td>
              <td>{item.itemPrice}</td>
              <td>
                <select />
              </td>
              <td>
                <ContextMenu />
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

function ContextMenu() {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="link" color="secondary" id="dropdown-basic">
        <IoEllipsisVertical />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item className="d-flex items align-items-center justify-content-between">View Invoices <TiDocument size="20px" color="blue"/></Dropdown.Item>
        <Dropdown.Item className="d-flex items align-items-center justify-content-between">Delete <BiTrash size="20px" color="red"/></Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}