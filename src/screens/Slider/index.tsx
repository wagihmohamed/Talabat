import { LoadingErrorPlaceholder, Sidebar } from "@/components";
import { useSlider } from "@/hooks";
import { SliderItem } from "./components";

export const SliderScreen = () => {
    const {
        data: sliderData = {
            results: []
        },
        isLoading,
        isError
    } = useSlider();
    return (
        <div className="border-t">
            <div className="h-screen">
                <Sidebar className="block">
                    <h1 className="text-2xl font-bold mb-8">سلايدر الصور</h1>
                    <LoadingErrorPlaceholder isLoading={isLoading} isError={isError}>
                        <div className="grid grid-cols-12 gap-4 mt-4">
                            {sliderData.results.map((sliderItem) => (
                                <SliderItem slider={sliderItem} key={sliderItem.id} />
                            ))}
                        </div>
                    </LoadingErrorPlaceholder>
                </Sidebar>
            </div>
        </div>
    );
};
