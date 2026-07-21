import os
import re

files_to_fix = [
    "src/components/layout/Navbar.jsx",
    "src/components/layout/Footer.jsx",
    "src/components/ui/MyCoursesSidebar.jsx",
    "src/components/ui/SeciPipelineBar.jsx",
    "src/components/ui/CourseSidebar.jsx",
    "src/components/ui/SeciFlowOverlay.jsx",
    "src/pages/SmartPauseDemo.jsx"
]

classes_to_map = [
    "flex", "flex-col", "items-center", "justify-center", "justify-between", "justify-end",
    "gap-2", "gap-3", "gap-4", "gap-6", "gap-8", "gap-10", "gap-16",
    "grid", "grid-cols-4",
    "w-full", "h-full", "w-10", "h-10", "w-8", "h-8", "w-6", "h-6", "w-4", "h-4", "w-2", "h-2",
    "text-white", "text-gray-300", "text-gray-400", "text-gray-500", "text-gray-600", "text-platzi", "text-yellow",
    "text-xs", "text-sm", "text-base", "text-lg", "text-xl", "text-2xl",
    "font-bold", "font-semibold", "font-mono", "font-serif",
    "rounded-xl", "rounded-lg", "rounded-full",
    "border", "border-b", "border-t", "border-r", "border-b-2", "border-dashed",
    "p-2", "p-3", "p-4", "p-6", "p-8", "px-2", "px-4", "px-6", "py-0.5", "py-2", "py-4", "py-8", "pt-4", "pt-5", "pt-16", "pb-8",
    "m-0", "mb-1", "mb-2", "mb-3", "mb-4", "mb-6", "mb-8", "mb-16", "mt-1", "mt-2", "mt-4", "mt-8", "mt-20", "ml-9", "ml-auto", "mx-auto", "mx-1", "mr-6", "mr-8",
    "absolute", "relative", "inset-0", "top-0", "left-0", "bottom-0", "right-0", "z-10", "z-20",
    "overflow-hidden", "overflow-y-auto",
    "flex-1", "flex-shrink-0",
    "cursor-pointer", "transition-colors", "transition-all", "duration-300", "duration-500", "duration-1000", "ease-in-out",
    "opacity-0", "opacity-50", "opacity-100", "grayscale",
    "shadow-lg", "shadow-2xl",
    "tracking-tight", "tracking-wider", "tracking-widest", "uppercase", "block", "hidden",
    "aspect-video", "object-cover", "backdrop-blur", "leading-relaxed", "max-w-lg", "max-w-4xl"
]

color_map = {
    "bg-[#0a1628]": "demo-bg-dark",
    "bg-[#0f213a]": "demo-bg-darker",
    "bg-[#08111e]": "demo-bg-darkest",
    "bg-black": "demo-bg-black",
    "bg-transparent": "demo-bg-transparent",
    "bg-white/5": "demo-bg-white-5",
    "bg-white/10": "demo-bg-white-10",
    "bg-gray-800": "demo-bg-gray-800",
    "bg-gray-700": "demo-bg-gray-700",
    "bg-gray-600": "demo-bg-gray-600",
    "bg-red-500": "demo-bg-red",
    "bg-blue-400": "demo-bg-blue",
    "bg-yellow-400": "demo-bg-yellow",
    "bg-platzi": "demo-bg-platzi",
    "bg-onto": "demo-bg-onto",
    "bg-ia": "demo-bg-ia",
    "border-gray-800": "demo-border-gray-800",
    "border-gray-700": "demo-border-gray-700",
    "border-platzi": "demo-border-platzi",
    "border-transparent": "demo-border-transparent",
    "text-[#0a1628]": "demo-text-dark",
    "text-yellow-400": "demo-text-yellow",
    "hover:text-white": "demo-hover-text-white",
    "hover:text-platzi": "demo-hover-text-platzi",
    "hover:bg-white/5": "demo-hover-bg-white-5",
    "hover:bg-[#1a2b45]": "demo-hover-bg-darker",
    "hover:border-gray-600": "demo-hover-border-gray-600",
    "hover:scale-105": "demo-hover-scale",
    "hover:grayscale-0": "demo-hover-grayscale-0",
    "group-hover:opacity-100": "demo-group-hover-opacity-100",
    "group-hover/progress:scale-100": "demo-group-hover-progress-scale-100",
    "scale-0": "demo-scale-0",
    "group": "demo-group",
    "group/progress": "demo-group-progress",
    "md:grid-cols-2": "demo-grid-footer",
    "lg:grid-cols-5": "demo-grid-footer",
    "md:block": "demo-md-block",
    "xl:flex-row": "demo-layout",
    "xl:flex": "demo-col-left",
    "bg-gradient-to-r from-platzi to-ia": "demo-bg-gradient-platzi",
    "bg-gradient-to-r from-transparent via-white/5 to-transparent": "demo-bg-gradient-shimmer",
    "bg-gradient-to-t from-black/90 via-black/50 to-transparent": "demo-bg-gradient-fade",
}

for filepath in files_to_fix:
    full_path = os.path.join(r"c:\Users\david\Desktop\PROYECTOS\Smart_Pause\frontend", filepath)
    if not os.path.exists(full_path):
        continue
    
    with open(full_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    # Replace simple classes
    for cls in classes_to_map:
        # Regex to match the class as a whole word inside className strings
        # using negative lookbehind and lookahead
        pattern = r'(?<![a-zA-Z0-9_-])' + re.escape(cls) + r'(?![a-zA-Z0-9_-])'
        content = re.sub(pattern, f'demo-{cls}', content)
        
    # Replace complex classes (colors, hovers, md:)
    for old_cls, new_cls in color_map.items():
        content = content.replace(old_cls, new_cls)
        
    # Fix py-0.5 to demo-py-05 because css classes can't have dots
    content = content.replace("demo-py-0.5", "demo-py-05")
        
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(content)

print("Done replacing classes.")
