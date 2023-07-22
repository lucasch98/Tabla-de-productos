import { useState } from "react";

function FilterableProductTable({ products }){
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return(
    <>
      <SearchBar 
        filterText={filterText} 
        inStockOnly={inStockOnly} 
        onFilterTextChange={setFilterText} 
        onInStockOnlyChange={setInStockOnly} />
      <ProductTable 
        products={products} 
        filterText={filterText}
        inStockOnly={inStockOnly} />
    </>
  );
}

function ProductCategoryRow({ category }){
  return(
      <tr>
          <th colSpan="2">{category}</th>
      </tr>
  );
}

function ProductRow({ product }){
  const productName = product.stocked ? product.name :
  <span style={{ color: 'red'}}>
    {product.name}
  </span>

  return(
    <tr>
      <td>{productName}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products, filterText, inStockOnly }){
  const rowsProducts = [];
  let lastCategory = null;

  products.forEach((product) => {

    if (
      product.name.toLowerCase().indexOf(
        filterText.toLowerCase()
      ) === -1
    ) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }

      if (product.category !== lastCategory){
          rowsProducts.push(
            <ProductCategoryRow 
              category={product.category} 
              key={product.category}/>
          );
        }
          rowsProducts.push(
            <ProductRow
              product={product}
              key={product.name}/>
          );
        lastCategory = product.category;
      
  });

  return(
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Precio</th>
        </tr>
      </thead>
      <tbody>{rowsProducts}</tbody>
    </table>
  )
}

function SearchBar({ filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange }){
  return(
    <form>
        <input 
        type="text"
        placeholder="Buscar..."
        value={filterText}
        onChange={(e) => onFilterTextChange(e.target.value)}/>
     
     <br />

      <label>
        <input 
          type="checkbox" 
          checked={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)}/>
        {' '} 
        Mostrar solo productos en stock
      </label>
    </form>
  );
}

const PRODUCTS = [
  {category: "Frutas", price: "$1", stocked: true, name: "Manzana"},
  {category: "Frutas", price: "$1", stocked: true, name: "Naranja"},
  {category: "Frutas", price: "$2", stocked: false, name: "Maracuyá"},
  {category: "Verduras", price: "$2", stocked: true, name: "Espinaca"},
  {category: "Verduras", price: "$4", stocked: false, name: "Calabaza"},
  {category: "Verduras", price: "$1", stocked: true, name: "Guisantes"}
];

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}