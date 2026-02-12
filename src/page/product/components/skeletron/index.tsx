export function SkeletronDetails() {
  return (
    <div className="grid lg:grid-cols-2 gap-12 mb-16 animate-pulse">
      {/* Product Images Skeleton */}
      <div className="space-y-4">
        <div className="aspect-square rounded-2xl bg-muted" />
      </div>

      {/* Product Info Skeleton */}
      <div>
        {/* Category Badge */}
        <div className="h-6 w-24 bg-muted rounded-full mb-4" />

        {/* Title */}
        <div className="h-10 bg-muted rounded-lg mb-4 w-3/4" />
        <div className="h-10 bg-muted rounded-lg mb-4 w-1/2 lg:hidden" />

        {/* Rating */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-5 h-5 bg-muted rounded-full" />
            ))}
          </div>
          <div className="h-4 w-32 bg-muted rounded" />
        </div>

        {/* Price */}
        <div className="h-10 w-40 bg-muted rounded-lg mb-6" />

        {/* Description */}
        <div className="space-y-2 mb-8">
          <div className="h-4 bg-muted rounded w-full" />
          <div className="h-4 bg-muted rounded w-full" />
          <div className="h-4 bg-muted rounded w-2/3" />
        </div>

        {/* Quantity */}
        <div className="mb-8">
          <div className="h-4 w-20 bg-muted rounded mb-3" />
          <div className="h-12 w-32 bg-muted rounded-lg" />
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="h-12 flex-1 bg-muted rounded-lg" />
          <div className="h-12 flex-1 bg-muted rounded-lg" />
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-border">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-muted rounded-lg" />
              <div className="space-y-2">
                <div className="h-3 w-16 bg-muted rounded" />
                <div className="h-3 w-20 bg-muted rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
