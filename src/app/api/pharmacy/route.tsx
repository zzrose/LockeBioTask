import { NextResponse } from "next/server";

// You can add new pharmacy in post pharmacy API

// export async function POST(request: Request, res: Response) {
//   try {

//     const data = await request.json()
//     const res = fetch(`http://pharmacy-mock-service-env.eba-xzj3bbnm.us-east-1.elasticbeanstalk.com/${data.pharmacy}/orders`, {
//       method: 'POST',
//       headers: {
//           'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data.payload),
//     })
//       .then((response) => response.json())
//       .then((data) => console.log(data));
//     return new Response('success', {
//       status: 200,
//     });
//   } catch (error) {
//     return NextResponse.json({ error: 'post error'}, { status: 500 });
//   }
// }

export async function GET(request: Request) {
  try {
    const res = await fetch(`http://pharmacy-mock-service-env.eba-xzj3bbnm.us-east-1.elasticbeanstalk.com/pharmacy`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      },
    })

    const textData = await res.text();
    return new Response(textData, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error: 'get error'}, { status: 500 });
  }
}
