const handleAddInvoice = () => {
    const { items, ...formDataWithoutItems } = formData;
    const groupsObject = formData.groups.reduce((prev, cur) => {
      prev[cur] = [];
      return prev;
    }, {});

    const groupsWithProducts = items.reduce((prev, item) => {
      prev[item.group].push(item.itemId);
      return prev;
    }, groupsObject);
    // handleEditInvoice
    if (isEdit) {
      dispatch(
        updateInvoice({
          id: parseInt(params.id),
          updatedInvoice: formDataWithoutItems,
        })
      );
      dispatch(updateProducts({ items, invoiceID: parseInt(params.id) }));
      dispatch(
        addGroup({ invoiceID: parseInt(params.id), groupsWithProducts })
      );
      alert("Invoice updated successfuly 🥳");
    } 
    // handleCreateInvoice
    else if (isCopy) {
      const invoiceID = generateRandomId();
      dispatch(addInvoice({ ...formDataWithoutItems, id: invoiceID }));
      dispatch(addProduct({ products: items, invoiceID: invoiceID }));

      dispatch(addGroup({ invoiceID, groupsWithProducts }));
      alert("Invoice added successfuly 🥳");
    } else {
      dispatch(addInvoice(formData));
      alert("Invoice added successfuly 🥳");
    }
    // handleDeleteInvoice
    if (deletedItems.length && params.id)
      dispatch(
        deleteInvoicesFromProduct({
          itemsIds: deletedItems,
          invoiceId: parseInt(params.id),
        })
      );
    navigate("/");
  };