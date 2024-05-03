import { IconProps } from "./Logo";

const VoiceIcon = ({ ...props }: IconProps) => {
    return (
        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M451.131077 1024C434.333538 1024 420.706462 1010.766769 420.706462 994.461538 420.706462 978.136615 434.333538 964.923077 451.131077 964.923077L472.615385 964.923077 472.615385 905.846154C322.363077 892.691692 204.091077 771.899077 177.230769 630.153846L236.307692 630.153846C264.014769 748.504615 381.676308 846.769231 512 846.769231 642.323692 846.769231 759.985231 748.504615 787.692308 630.153846L846.769231 630.153846C819.908923 771.899077 701.636923 892.691692 551.384615 905.846154L551.384615 964.923077 572.868923 964.923077C589.666462 964.923077 603.293538 978.136615 603.293538 994.461538 603.293538 1010.766769 589.666462 1024 572.868923 1024L451.131077 1024ZM512 787.692308C394.338462 787.692308 295.384615 685.272615 295.384615 571.076923L295.384615 196.923077C295.384615 82.727385 394.338462 0 512 0 629.661538 0 728.615385 82.727385 728.615385 196.923077L728.615385 571.076923C728.615385 685.272615 629.661538 787.692308 512 787.692308ZM669.538462 196.923077C669.538462 115.357538 596.046769 59.076923 512 59.076923 427.953231 59.076923 354.461538 115.357538 354.461538 196.923077L354.461538 571.076923C354.461538 652.642462 427.953231 728.615385 512 728.615385 596.046769 728.615385 669.538462 652.642462 669.538462 571.076923L669.538462 196.923077Z"  />
        </svg>
    );
};

export default VoiceIcon;