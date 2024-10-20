import Image from "next/image"

export default function Testimonials() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center text-green-800">Testimonials</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "Alice Johnson", review: "TaskSwap has transformed how I interact with my neighbors. It's not just about tasks; it's about building real connections." },
            { name: "Bob Smith", review: "I've saved so much money and learned new skills thanks to TaskSwap. It's a game-changer for our community!" },
            { name: "Carol Davis", review: "The platform is user-friendly and the community is so supportive. I've met amazing people while getting things done." },
          ].map((testimonial, index) => (
            <div key={index} className="rounded-lg border border-green-200 bg-white text-green-800 shadow-sm">
              <div className="p-6 space-y-4">
                <div className="flex items-center space-x-4">
                  <Image
                    src={`/placeholder.svg?height=40&width=40&text=${testimonial.name.charAt(0)}`}
                    alt={testimonial.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="text-lg font-bold">{testimonial.name}</h3>
                    <p className="text-sm text-green-600">Community Member</p>
                  </div>
                </div>
                <p className="text-sm text-green-700">{testimonial.review}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
