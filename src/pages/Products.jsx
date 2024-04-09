import React from "react";
import { useProducts } from "../redux/products/hooks";
import {useDispatch} from "react-redux"
import { Table, Dropdown } from "react-bootstrap";
import { IoEllipsisVertical } from "react-icons/io5";
import { TiDocument } from "react-icons/ti";
import EmptyBox from "../components/EmptyBox";
import { BiTrash } from "react-icons/bi";
import EditableField from "../components/EditableField";
import { updateProducts } from "../redux/products/productsSlice";

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
          <th>Quantity</th>
          <th>More</th>
        </tr>
      </thead>
      <tbody>
        {products.map((item, i) => {
          return (
            <ProductRow
              name={item.itemName}
              description={item.itemDescription}
              price={item.itemPrice}
              id={item.itemId}
              quantity={item.itemQuantity}
              productIdx = {i}
            />
          );
        })}
      </tbody>
    </Table>
  );
}

function ProductRow({ name, description, price,quantity, id,productIdx }) {
  const dispatch =useDispatch()
  const {products} = useProducts()
  const editProduct = (e)=>{
    dispatch(updateProducts({items:[{...products[productIdx],[e.target.name]:e.target.value}]}))
  }
  
  return (
    <tr id={id} key={id} style={{ paddingInline: "1rem" }}>
      <td style={{ width: "70px" }}>{id}</td>
      <td>
        <EditableField
          onItemizedItemEdit={editProduct}
          cellData={{
            type: "text",
            name: "itemName",
            placeholder: "Item name",
            value: name,
            id: id,
          }}
        />
      </td>
      <td>
        <EditableField
          onItemizedItemEdit={editProduct}
          cellData={{
            type: "text",
            name: "itemDescription",
            placeholder: "Item description",
            value: description,
            id: id,
          }}
        />
      </td>
      <td style={{width:"8rem"}}>
        <EditableField
          onItemizedItemEdit={editProduct}
          cellData={{
            type: "number",
            name: "itemPrice",
            min: 1,
            step: "0.01",
            presicion: 2,
            value: price,
            id: id
          }}
        />
      </td>
      <td style={{width:"8rem"}}>
        <EditableField
          onItemizedItemEdit={editProduct}
          cellData={{
            type: "number",
            name: "itemQuantity",
            value: quantity,
            id: id
          }}
        />
      </td>
      <td>
        <ContextMenu />
      </td>
    </tr>
  );
}

function ContextMenu() {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="link" color="secondary" id="dropdown-basic">
        <IoEllipsisVertical />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item className="d-flex items align-items-center justify-content-between">
          View Invoices <TiDocument size="20px" color="blue" />
        </Dropdown.Item>
        <Dropdown.Item className="d-flex items align-items-center justify-content-between">
          Delete <BiTrash size="20px" color="red" />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
