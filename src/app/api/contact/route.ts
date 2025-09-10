import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // バリデーション
    if (!data.type || !data.title || !data.description) {
      return NextResponse.json({ error: '必須フィールドが不足しています' }, { status: 400 });
    }

    // メール送信
    await resend.emails.send({
      from: 'noreply@resend.dev', // Resendのデフォルトドメイン
      to: [process.env.CONTACT_EMAIL || 'your-email@example.com'], // お問い合わせ先のメールアドレス（自分のメアド）
      subject: `[${data.type === 'bug' ? '不具合報告' : '改善要望'}] ${data.title}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            お問い合わせ内容
          </h2>

          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>タイプ:</strong>
              <span style="color: ${data.type === 'bug' ? '#dc3545' : '#28a745'};">
                ${data.type === 'bug' ? '不具合報告' : '改善要望'}
              </span>
            </p>
            <p style="margin: 10px 0;"><strong>タイトル:</strong> ${data.title}</p>
            <p style="margin: 10px 0;"><strong>詳細:</strong></p>
            <div style="background-color: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
              ${data.description.replace(/\n/g, '<br>')}
            </div>
            ${data.contact ? `<p style="margin: 10px 0;"><strong>連絡先:</strong> ${data.contact}</p>` : ''}
          </div>

          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            このメールは DQX Sewing Tool のお問い合わせフォームから送信されました。
          </p>
        </div>
      `,
    });

    return NextResponse.json({ message: 'メールを送信しました' });
  } catch (error) {
    console.error('メール送信エラー:', error);
    return NextResponse.json({ error: 'メール送信に失敗しました' }, { status: 500 });
  }
}
