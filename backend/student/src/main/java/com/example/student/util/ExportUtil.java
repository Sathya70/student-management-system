
package com.example.student.util;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;

public class ExportUtil {

	public static byte[] generatePdf(String title, List<String> lines) throws IOException {
		StringBuilder contentBuilder = new StringBuilder();
		contentBuilder.append("BT /F1 16 Tf 50 760 Td (").append(escapeText(title)).append(") Tj ET\n");
		int y = 740;
		for (String line : lines) {
			if (y < 40) {
				break;
			}
			contentBuilder.append("BT /F1 10 Tf 50 ").append(y).append(" Td (").append(escapeText(line))
					.append(") Tj ET\n");
			y -= 18;
		}

		byte[] contentBytes = contentBuilder.toString().getBytes(StandardCharsets.US_ASCII);

		String header = "%PDF-1.4\n";
		String obj1 = "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n";
		String obj2 = "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n";
		String obj3 = "3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj\n";
		String obj4 = "4 0 obj\n<< /Length " + contentBytes.length + " >>\nstream\n"
				+ new String(contentBytes, StandardCharsets.US_ASCII) + "\nendstream\nendobj\n";
		String obj5 = "5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n";

		ByteArrayOutputStream output = new ByteArrayOutputStream();
		output.write(header.getBytes(StandardCharsets.US_ASCII));

		int offset = header.getBytes(StandardCharsets.US_ASCII).length;
		int obj1Offset = offset;
		output.write(obj1.getBytes(StandardCharsets.US_ASCII));
		offset += obj1.getBytes(StandardCharsets.US_ASCII).length;
		int obj2Offset = offset;
		output.write(obj2.getBytes(StandardCharsets.US_ASCII));
		offset += obj2.getBytes(StandardCharsets.US_ASCII).length;
		int obj3Offset = offset;
		output.write(obj3.getBytes(StandardCharsets.US_ASCII));
		offset += obj3.getBytes(StandardCharsets.US_ASCII).length;
		int obj4Offset = offset;
		output.write(obj4.getBytes(StandardCharsets.US_ASCII));
		offset += obj4.getBytes(StandardCharsets.US_ASCII).length;
		int obj5Offset = offset;
		output.write(obj5.getBytes(StandardCharsets.US_ASCII));
		offset += obj5.getBytes(StandardCharsets.US_ASCII).length;

		int xrefOffset = offset;
		StringBuilder xrefBuilder = new StringBuilder();
		xrefBuilder.append("xref\n0 6\n");
		xrefBuilder.append(String.format("%010d %05d f \n", 0, 0));
		xrefBuilder.append(String.format("%010d %05d n \n", obj1Offset, 0));
		xrefBuilder.append(String.format("%010d %05d n \n", obj2Offset, 0));
		xrefBuilder.append(String.format("%010d %05d n \n", obj3Offset, 0));
		xrefBuilder.append(String.format("%010d %05d n \n", obj4Offset, 0));
		xrefBuilder.append(String.format("%010d %05d n \n", obj5Offset, 0));

		output.write(xrefBuilder.toString().getBytes(StandardCharsets.US_ASCII));

		String trailer = "trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n" + xrefOffset + "\n%%EOF";
		output.write(trailer.getBytes(StandardCharsets.US_ASCII));

		return output.toByteArray();
	}

	public static byte[] generateCsv(List<String[]> rows) {
		StringBuilder builder = new StringBuilder();
		for (String[] row : rows) {
			for (int i = 0; i < row.length; i++) {
				String cell = row[i] == null ? "" : row[i].replace("\"", "\"\"");
				builder.append('"').append(cell).append('"');
				if (i < row.length - 1) {
					builder.append(',');
				}
			}
			builder.append('\n');
		}
		return builder.toString().getBytes(StandardCharsets.UTF_8);
	}

	private static String escapeText(String text) {
		if (text == null) {
			return "";
		}
		return text.replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)");
	}
}
