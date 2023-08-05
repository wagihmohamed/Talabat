import { Image, Card, Text, Group } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { Button, Badge, Avatar, AvatarFallback, AvatarImage } from '@/components';
import { useProductItemStyles } from './styles';
import { Product } from '@/models';
import { DeleteProductDialog } from '..';
import { useNavigate } from 'react-router-dom';
import { DropdownMenuRadioGroupDemo } from '../ProductActionsDropdown';

interface ProductItemProps {
    product: Product;
}

export const ProductCard = ({ product }: ProductItemProps) => {
    const { classes } = useProductItemStyles();
    const navigate = useNavigate();

    const images = product.productImages.map((image) => image.image);

    const slides = images.map((image) => (
        <Carousel.Slide key={image}>
            <Image withPlaceholder alt='product image' src={image} height={220} />
        </Carousel.Slide>
    ));

    return (
        <Card radius="md" className='col-span-3 md:col-span-2 lg:col-span-1 shadow-sm' withBorder padding="xl">
            <Card.Section>
                <Carousel
                    dir='ltr'
                    withIndicators
                    loop
                    classNames={{
                        root: classes.carousel,
                        controls: classes.carouselControls,
                        indicator: classes.carouselIndicator,
                    }}
                >
                    {slides}
                </Carousel>
            </Card.Section>

            <Group position="apart" mt="lg">
                <Text fw={500} fz="lg">
                    {product.title}
                </Text>
                <Group spacing={5}>
                    <Text fz="xl" span fw={500} className={classes.price}>
                        {product.price}$
                    </Text>
                </Group>
            </Group>
            <div className="flex justify-between items-center">
                <div>
                    <Text fz="sm" c="dimmed" mt="xs">
                        القسم: {product.category?.name ?? 'غير محدد'}
                    </Text>
                </div>
                <Text fz="sm" c="" mt="xs">
                    المباع: {product.orders}
                </Text>
            </div>
            <div className='flex gap-4 items-center'>
                <Text fz="sm" c="dimmed" mt="xs">
                    البائع: {product.user?.name ?? 'غير محدد'}
                </Text>
                <Avatar>
                    <AvatarImage src={product.user?.image?.toString()} />
                    <AvatarFallback>{product.user?.name ?? 'MM'}</AvatarFallback>
                </Avatar>
            </div>

            <Text fz="sm" c="dimmed" mt="sm">
                {product.description}
            </Text>
            <div className="flex items-center mt-4 flex-wrap">
                {product.available ? (<Badge className="mr-2">
                    متاح
                </Badge>) : (
                    <Badge variant='destructive' className="mr-2">
                        غير متاح
                    </Badge>
                )}
                {product.featured &&
                    <Badge variant='outline' className="mr-2">
                        مميز
                    </Badge>}
            </div>
            <Group mt="md">
                <Button onClick={() => {
                    navigate(`${product.id}/edit`, {
                        state: {
                            product
                        }
                    });
                }} variant='outline'>تعديل</Button>
                <DeleteProductDialog product={product} />
                <DropdownMenuRadioGroupDemo product={product} />
            </Group>
        </Card>
    );
}