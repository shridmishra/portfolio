import { Skeleton } from "./skeleton";
import { Separator } from "./separator";
import { SeparatorLine } from "./separator-line";

export const HeroSkeleton = () => (
  <div className="px-6 sm:px-8 py-12 sm:py-16 space-y-6">
    <Skeleton className="h-12 w-3/4" />
    <Skeleton className="h-6 w-full" />
    <Skeleton className="h-6 w-5/6" />
    <div className="flex gap-3 pt-4">
      <Skeleton className="h-10 w-32" />
      <Skeleton className="h-10 w-32" />
    </div>
  </div>
);

export const ProjectsSkeleton = () => (
  <div className="space-y-8">
    <Skeleton className="h-8 w-48" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="h-48 w-full rounded-lg" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
        </div>
      ))}
    </div>
  </div>
);

export const BentoSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-8 w-48" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-2 space-y-3">
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>
      <div className="md:col-span-2 space-y-3">
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>
    </div>
  </div>
);

export const ExperienceSkeleton = () => (
  <div className="space-y-8">
    <Skeleton className="h-8 w-48" />
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="space-y-3">
          <div className="flex items-start gap-4">
            <Skeleton className="h-12 w-12 rounded-full flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const PageSkeleton = () => (
  <div className="min-h-screen min-w-full bg-background relative">
    <div className="relative z-10 max-w-lg sm:max-w-3xl mx-auto">
      <div className="relative">
        <Separator orientation="vertical" className="absolute left-0 top-0 bottom-0 -translate-x-1/2 z-50" />
        <Separator orientation="vertical" className="absolute right-0 top-0 bottom-0 translate-x-1/2 z-50" />
        <HeroSkeleton />
        
        <div className="px-6 sm:px-8">
          <SeparatorLine />
        </div>
        
        <div className="px-6 sm:px-8 py-12 sm:py-16">
          <ProjectsSkeleton />
        </div>
        
        <div className="border-t border-edge" />
        
        <div className="px-6 sm:px-8 py-12 sm:py-16">
          <BentoSkeleton />
        </div>
        
        <div className="border-t border-edge" />
        
        <div className="px-6 sm:px-8 py-12 sm:py-16">
          <ExperienceSkeleton />
        </div>
      </div>
    </div>
  </div>
);
