import prisma from '../client';

async function main() {
  const burguer = await prisma.product.upsert({
    where: { name: 'Hamburguer da Casa' },
    update: {},
    create: {
      name: 'Hamburguer da Casa',
      cover_image:
        'https://img.freepik.com/free-psd/fresh-beef-burger-isolated-transparent-background_191095-9018.jpg?size=338&ext=jpg&ga=GA1.1.2082370165.1710806400&semt=sph',
      description:
        'Hambúrguer 200g, alface, tomate, picles, cebola roxa, queijo',
      price: 27.99,
      category: 'side',
    },
  });

  const fries = await prisma.product.upsert({
    where: { name: 'Batata da Casa' },
    update: {},
    create: {
      name: 'Batata da Casa',
      cover_image:
        'https://img.freepik.com/free-psd/french-fries-with-sauce-round-basket-transparent-background_84443-1392.jpg?t=st=1710880588~exp=1710884188~hmac=1a6eb96aac4c95486531c2256c3c2b26c2d53fe6c2a0c91b5edc6720e1cca9ce&w=740',
      description: 'Batatas bem fritas',
      price: 18,
      category: 'side',
    },
  });

  const icedTea = await prisma.product.upsert({
    where: { name: 'Chá de limão' },
    update: {},
    create: {
      name: 'Chá de limão',
      cover_image:
        'https://img.freepik.com/free-psd/iced-tea-bottle-isolated-transparent-background_191095-28450.jpg?t=st=1710881036~exp=1710884636~hmac=034a50ef8f7602f8946729ae330ca945e345ef722a7217477d19c496eb9bf40b&w=740',
      description: 'Chá mate com limão',
      price: 10,
      category: 'drink',
    },
  });

  const combo = await prisma.product.upsert({
    where: { name: 'Hamburguer com fritas' },
    update: {},
    create: {
      name: 'Hamburguer com fritas',
      cover_image:
        'https://img.freepik.com/premium-psd/burger-french-fries-isolated-transparent-background-png-psd_888962-560.jpg?w=826',
      description: 'O hamburguer da Casa acompanhado das melhores fritas',
      category: 'combo',
      price: 42,
      combo: true,
    },
  });

  const iceCream = await prisma.product.upsert({
    where: { name: 'Casquinha' },
    update: {},
    create: {
      name: 'Casquinha',
      cover_image:
        'https://img.freepik.com/free-psd/ice-cream-isolated-transparent-background_191095-10433.jpg?w=740&t=st=1710881622~exp=1710882222~hmac=8baab919c5f60d1cafa7cc7cd0b1601b46d10f2c5449e759f1bf8b2d6d15f2d7',
      description: 'Casquinha caseira e sorvete',
      category: 'dessert',
      price: 11,
    },
  });

  const fullCombo = await prisma.product.upsert({
    where: { name: 'Combo completo' },
    update: {},
    create: {
      name: 'Combo completo',
      cover_image:
        'https://img.freepik.com/free-photo/burger-with-soda-french-fries_23-2148273037.jpg?w=996&t=st=1710882765~exp=1710883365~hmac=ae5733029dc1f17c77f1446be37e8d1ba0dad5cfde86864a8de02743ba46b34c',
      description: 'Hamburguer, fritas e bebida',
      category: 'combo',
      price: 50,
      combo: true,
    },
  });

  const burguer2 = await prisma.product.upsert({
    where: { name: 'Hamburguinho da Casa' },
    update: {},
    create: {
      name: 'Hamburguinho da Casa',
      cover_image:
        'https://img.freepik.com/free-psd/fresh-beef-burger-isolated-transparent-background_191095-9018.jpg?size=338&ext=jpg&ga=GA1.1.2082370165.1710806400&semt=sph',
      description:
        'Hambúrguer 200g, alface, tomate, picles, cebola roxa, queijo',
      price: 27.99,
      category: 'side',
    },
  });

  const fries2 = await prisma.product.upsert({
    where: { name: 'Batatinha da Casa' },
    update: {},
    create: {
      name: 'Batatinha da Casa',
      cover_image:
        'https://img.freepik.com/free-psd/french-fries-with-sauce-round-basket-transparent-background_84443-1392.jpg?t=st=1710880588~exp=1710884188~hmac=1a6eb96aac4c95486531c2256c3c2b26c2d53fe6c2a0c91b5edc6720e1cca9ce&w=740',
      description: 'Batatas bem fritas',
      price: 18,
      category: 'side',
    },
  });

  const icedTea2 = await prisma.product.upsert({
    where: { name: 'Chazinho de limão' },
    update: {},
    create: {
      name: 'Chazinho de limão',
      cover_image:
        'https://img.freepik.com/free-psd/iced-tea-bottle-isolated-transparent-background_191095-28450.jpg?t=st=1710881036~exp=1710884636~hmac=034a50ef8f7602f8946729ae330ca945e345ef722a7217477d19c496eb9bf40b&w=740',
      description: 'Chá mate com limão',
      price: 10,
      category: 'drink',
    },
  });

  const combo2 = await prisma.product.upsert({
    where: { name: 'Hamburguinho com fritas' },
    update: {},
    create: {
      name: 'Hamburguinho com fritas',
      cover_image:
        'https://img.freepik.com/premium-psd/burger-french-fries-isolated-transparent-background-png-psd_888962-560.jpg?w=826',
      description: 'O hamburguer da Casa acompanhado das melhores fritas',
      category: 'combo',
      price: 42,
      combo: true,
    },
  });

  const iceCream2 = await prisma.product.upsert({
    where: { name: 'Cascão' },
    update: {},
    create: {
      name: 'Cascão',
      cover_image:
        'https://img.freepik.com/free-psd/ice-cream-isolated-transparent-background_191095-10433.jpg?w=740&t=st=1710881622~exp=1710882222~hmac=8baab919c5f60d1cafa7cc7cd0b1601b46d10f2c5449e759f1bf8b2d6d15f2d7',
      description: 'Casquinha caseira e sorvete',
      category: 'dessert',
      price: 11,
    },
  });

  const fullCombo2 = await prisma.product.upsert({
    where: { name: 'Combão completo' },
    update: {},
    create: {
      name: 'Combão completo',
      cover_image:
        'https://img.freepik.com/free-photo/burger-with-soda-french-fries_23-2148273037.jpg?w=996&t=st=1710882765~exp=1710883365~hmac=ae5733029dc1f17c77f1446be37e8d1ba0dad5cfde86864a8de02743ba46b34c',
      description: 'Hamburguer, fritas e bebida',
      category: 'combo',
      price: 50,
      combo: true,
    },
  });

  const bacon = await prisma.additional.upsert({
    where: { name: 'Bacon' },
    update: {},
    create: {
      name: 'Bacon',
      description: '10g',
      price: 1,
      cover_image:
        'https://img.freepik.com/psd-premium/fatias-de-bacon-isoladas-em-transparente-png-psd_888962-596.jpg?w=900',
    },
  });

  const cheddar = await prisma.additional.upsert({
    where: { name: 'Cheddar' },
    update: {},
    create: {
      name: 'Cheddar',
      description: '10g',
      price: 1,
      cover_image:
        'https://img.freepik.com/psd-premium/fatias-de-bacon-isoladas-em-transparente-png-psd_888962-596.jpg?w=900',
    },
  });

  const bbqSauce = await prisma.additional.upsert({
    where: { name: 'Molho' },
    update: {},
    create: {
      name: 'Molho',
      description: 'Barbecue',
      price: 1,
      cover_image:
        'https://img.freepik.com/psd-premium/fatias-de-bacon-isoladas-em-transparente-png-psd_888962-596.jpg?w=900',
    },
  });

  console.log({
    burguer,
    fries,
    icedTea,
    combo,
    iceCream,
    fullCombo,
    burguer2,
    combo2,
    fries2,
    fullCombo2,
    iceCream2,
    icedTea2,
    bacon,
    cheddar,
    bbqSauce,
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
