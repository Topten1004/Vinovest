import { timeFormat } from "d3-time-format";

export const formatDate = timeFormat("%b %d, '%y");

export const getElementDimensions = (node) => ({
    width: node ? node.offsetWidth : 0,
    height: node ? node.offsetHeight : 0,
});

export const calculateYTooltipPosition = (node, tooltip, width, height) => {
    const tooltipDimensions = getElementDimensions(node);
    const tooltipWidth = tooltipDimensions.width + 50;
    const tooltipHeight = tooltipDimensions.height + 25;
    const { left, top } = tooltip;
    const isOverflowLeft = left + tooltipWidth >= width;
    const leftPos = isOverflowLeft ? left - tooltipWidth + 12 : left + 12;
    const topPos = isOverflowLeft ? top - tooltipHeight : top !== height ? top - 12 : top - 50;

    return {
        top: topPos,
        left: leftPos,
    };
};
