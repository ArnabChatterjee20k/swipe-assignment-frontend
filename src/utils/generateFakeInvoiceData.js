import {faker} from "@faker-js/faker";
export const generateFakeInvoiceData = (initial) => {
  const invoiceNumber = faker.number.int();
  const numberOfItems = faker.word.noun().length; // Generate random number of items
  const items = Array.from({ length: numberOfItems }, () => ({
    itemId: faker.datatype.number(),
    itemName: faker.commerce.productName(),
    itemDescription: faker.lorem.words(),
    itemPrice: faker.finance.amount(),
    itemQuantity: faker.datatype.number({ min: 1, max: 10 }),
  }));

  return {
    ...initial,
    invoiceNumber,
    dateOfIssue: faker.date.past().toLocaleDateString(),
    billTo: faker.person.fullName(),
    billToEmail: faker.internet.email(),
    billToAddress: faker.location.city(),
    billFrom: faker.person.fullName(),
    billFromEmail: faker.internet.email(),
    billFromAddress: faker.location.city(),
    notes: faker.lorem.sentence(),
    items,
  };
};