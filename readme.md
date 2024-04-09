### About the Store Data Modelling
* Invoices , Products , Groups are three entities here
* A single product can be related to multiple invoices. Many invoices can use a single product and modify it.
* invoices is an array which stores invoice properties only.
* products is array of products and the invoices it is related to.
* Every invoice can have unique set of groups. And groups consist of products.
* groups is object of invoiceids and the corresponding groupnames and product ids.