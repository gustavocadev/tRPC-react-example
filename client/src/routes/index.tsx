import { FormEvent, useState } from 'react';
import { trpc } from '../utils/trpc';

const IndexPage = () => {
  const [name, setName] = useState('');

  const client = trpc.useContext();

  // usarmos la ruta y el metodo useQuery para obtener los datos - equivale a hacer un fetch de tipo GET
  const productsQuery = trpc.getProducts.useQuery();

  // creamos una instancia
  const mutation = trpc.createProduct.useMutation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name.trim().length === 0) return;

    // usamos la instancia y el metodo mutate para enviar los datos - equivale a hacer un fetch de tipo POST y el mutat seria el body()
    mutation.mutate(
      { productName: name },
      {
        onSuccess: () => {
          client.getProducts.invalidate();
        },
      }
    );

    setName('');
  };

  return (
    <div>
      <h1>Index Page</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setName(e.currentTarget.value)}
          value={name}
        />
        <button type="submit">Enviar</button>
      </form>
      <ul>
        {productsQuery.data?.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};
export default IndexPage;
